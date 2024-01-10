import ShowAnswerButton from "./ShowAnswerButton";

export default function QACard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {

  return (
    <div className="mockup-window border bg-base-300 mb-2 dropdown">
      <div className="grid grid-cols-1 gap-0 bg-base-200">
        <div id={`question-${question}`} className="flex justify-center items-center flex-col py-16 bg-base-200 overflow-y-auto">
          <div>{question}</div>
        </div>
        <div id={`answer-${question}`}className="flex justify-center items-center flex-col py-16 bg-base-200 overflow-y-auto" style={{ "display": "none" }}>
          <div>{answer}</div>
        </div>
        <div className="flex justify-center items-center bg-base-200">
          <ShowAnswerButton question={question}/>
        </div>
      </div>
    </div>
  );
}
