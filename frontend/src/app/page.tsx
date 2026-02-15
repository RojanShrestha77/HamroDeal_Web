import Container from "@/app/components/common/Container";
import HomePage from "@/app/home/Home";

export default function Home() {
  return (
    <div className="m-0 p-0 w-full">
      <Container>
        <div>
          <HomePage />
        </div>
        {/* <Home /> */}
      </Container>
    </div>
  );
}
