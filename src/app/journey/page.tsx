import { Box, BoxFull } from "@/features/3d-presentation/components/box";
import { Scene } from "@/features/3d-presentation/components/scroll-scene";

export default function JourneyPage() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Scene models={[<Box key={"box1"} />, <BoxFull key="box2" />]} />
      </div>
      <div className="relative flex min-h-screen flex-col items-center justify-between">
        <div className="my-[50vh] w-full max-w-4xl space-y-96 px-8">
          <section className="py-20 text-center">
            <h2 className="mb-4 text-2xl font-semibold">
              Section 1: Wireframe
            </h2>
            <p>Box wireframe section 1</p>
          </section>

          <section className="py-20 text-center">
            <h2 className="mb-4 text-2xl font-semibold">Section 2: Full Box</h2>
            <p>Full box section 2</p>
          </section>
        </div>
      </div>
    </>
  );
}
