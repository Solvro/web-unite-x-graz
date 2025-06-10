import { Background3D } from "@/components/background-3d";
import { Box, BoxFull } from "@/components/box";

export default function JourneyPage() {
  return (
    <>
      <Background3D models={[<Box key={"box1"} />, <BoxFull key="box2" />]} />
      <div className="relative flex min-h-screen flex-col items-center justify-between">
        <div className="mt-32 text-center">
          <h1 className="text-3xl font-bold">Journey Page</h1>
          <p className="mt-4 text-lg">This is the journey page content.</p>
        </div>
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
