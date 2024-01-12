"use client";

import clsx from "clsx";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { show_diff_message, Grades, Rating, State, Grade, Card, ReviewLog, createEmptyCard, fsrs, RecordLogItem, RecordLog } from "ts-fsrs";

type ScheduleRecord = {
  card: Card,
  logs: ReviewLog[]
}

type Schedule = {
  [key: string]: {
    [key: string]: ScheduleRecord
  }
}

function loadScheduleData(question: string): ScheduleRecord {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return {
      card: createEmptyCard(dayjs().toDate()),
      logs: []
    };
  }
  const titleTag = document.querySelector("title")?.innerText || ""
  console.log(titleTag)
  const schedule = JSON.parse(localStorage.getItem("schedule") || JSON.stringify({ [titleTag]: {} })) as Schedule;
  if(schedule[titleTag]===undefined){
    schedule[titleTag] = {}
  }
  if (schedule[titleTag][question] === undefined) {
    schedule[titleTag][question] = {
      card: createEmptyCard(dayjs().toDate()),
      logs: []
    };
  }
  return schedule[titleTag][question];
}

function storeSchedule(question: string, card: Card, rating: Rating): ScheduleRecord {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { card, logs: [] };
  }
  const f = fsrs();
  const now = dayjs().toDate()
  const titleTag = document.querySelector("title")?.innerText || ""
  const schedule = JSON.parse(localStorage.getItem("schedule") || JSON.stringify({ [titleTag]: {} })) as Schedule;
  if(schedule[titleTag]===undefined){
    schedule[titleTag] = {}
  }
  let recordItem;
  if (rating === Rating.Manual) {
    recordItem = f.forget(card, now);
  } else {
    recordItem = f.repeat(card, now)[rating as Grade];
  }
  if (schedule[titleTag][question] === undefined) {
    schedule[titleTag][question] = {
      card: recordItem.card,
      logs: [recordItem.log]
    };
  } else {
    schedule[titleTag][question].card = recordItem.card;
    schedule[titleTag][question].logs.push(recordItem.log);
  }
  localStorage.setItem("schedule", JSON.stringify(schedule));
  return schedule[titleTag][question];
}


function ShowAnswerButton({ question }: { question: string }) {
  function isCompelted(card: Card): boolean {
    return card.state === State.Review && dayjs(card.due) > dayjs();
  }
  const color = ["btn-error", "btn-warning", "btn-info", "btn-success"];
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState(loadScheduleData(question));
  const [schedule, setSchedule] = useState<RecordLog>();
  const [completed, setCompleted] = useState(false);
  const [retrievability, setRetrievability] = useState<string>();
  const f = fsrs();
  const handleClick = (status: boolean, rating?: Rating) => {
    setOpen(status);
    const answer = document.getElementById(`answer-${question}`);
    const question_el = document.getElementById(`question-${question}`);
    if (answer && question_el) {
      answer.style.display = status ? "flex" : "none";
      question_el.style.display = status ? "none" : "flex";
    }
    if (status) {
      setSchedule(f.repeat(record.card, dayjs().toDate()));
    }
    if (rating !== undefined) {
      const record_new = storeSchedule(question, record.card, rating)
      setRecord(record_new);
      setCompleted(isCompelted(record_new.card));
    }
  }
  useEffect(() => {
    const c= isCompelted(record.card)
    if (c) {
      const r = f.get_retrievability(record.card, dayjs().toDate())
      setRetrievability(r !== '100.00%' ? r : undefined);
    }
    setCompleted(c);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record.card])

  useEffect(() => {

  },[])
  return !open ? (
    <>
      {retrievability && (
        <div className="text-sm">
          <div>D:{record.card.difficulty.toFixed(2)}</div>
          <div>S:{record.card.stability.toFixed(2)}</div>
          <div>R:{retrievability}</div>
        </div>
      )}
      {completed && <button className={clsx("btn", completed ? retrievability ? "w-1/3" : "w-1/2" : "w-full")} onClick={() => handleClick(false, Rating.Manual)} >forget</button>}
      <button className={clsx("btn", completed ? retrievability ? "w-1/3" : "w-1/2" : "w-full")} onClick={() => handleClick(true)}>show</button>
    </>
  ) : (
    schedule && (
      !completed ?
        <div className="flex justify-center pt-6">
          {Grades.map((grade: Grade) =>
            show_diff_message(
              schedule[grade].card.due,
              schedule[grade].card.last_review as Date,
              true
            )
          ).map((time: string, index: number) => (
            <button
              key={Rating[(index + 1) as Grade]}
              className={"btn mx-2 mb-2 btn-sm md:btn-md tooltip tooltip-bottom " + color[index]}
              onClick={() => handleClick(false, (index + 1) as Grade)}
              data-tip={time}
            >
              <span>{Rating[(index + 1) as Grade]}</span>
            </button>
          ))}
        </div>
        : <button className={clsx("btn", "w-full")} tabIndex={0} role="button" onClick={() => handleClick(false)}>close</button>
    )
  );
}

export default ShowAnswerButton;
