import "./style.css";

export default function Landing() {
  return (
    <section className="landing--section font-serif">
      <div className="hero--container ">
        <div className="h-screen w-full text-white flex flex-wrap align-center justify-center flex-col pt-[30px] text-center p-6 fade-in-text lg:p-14">
          <div className="text-left w-5/6">
            <div className="text-7xl lg:text-9xl">
              <h1>F.Visor</h1>
            </div>
            <div className="text-2xl tracking-wide mb-14 mt-4">
              <h2>Keep Track and Manage</h2>
            </div>
          </div>

          <div className="w-5/6 mt-6 italic text-xs text-left tracking-widest lg:w-5/6 flex align-left font-mono font-light">
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi eget ligula viverra facilisis. Ut non
              ipsum lacinia, sollicitudin lorem non, euismod justo.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
