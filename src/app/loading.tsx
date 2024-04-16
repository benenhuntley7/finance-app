/* COLOURS
text-primary: blue
text-secondary: purple
text-accent: aqua
text-neutral: black
text-info: light blue
text-success: green
text-warning: yellow
text-error: red
*/

export default function Loading() {
  return (
    <div className="flex justify-center items-center text-neutral">
      {/* Parent container with flex and centering properties */}
      <div className="loading loading-spinner w-15 h-15 max-w-15 max-h-15"></div>
    </div>
  );
}
