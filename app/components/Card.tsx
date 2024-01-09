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
    <div className="flex justify-center items-center flex-col min-h-16 bg-base-200">
      <div>{question}</div>
    </div>
    <div tabIndex={0} className="dropdown-content mx-auto flex justify-center min-h-16 items-center bg-base-200 ">
        <div className="flex justify-center items-center ">{answer}</div>
    </div>
    <div className="flex justify-center items-center bg-base-200">
      <button className="btn w-full" tabIndex={0} role="button">show</button>
    </div>
  </div>
</div>
  );
}
