import Container from "@/app/components/Container";
import HomePage from "@/app/components/Home";
import { Button } from "@/app/components/ui/button";
import AuthSection from "@/app/components/AuthSection"; // ✅

export default function Home() {
  return (
    <div className="m-0 p-0 w-full">
      <Container>
        <div>
          <HomePage />
          <AuthSection />
        </div>
        {/* <Home /> */}
      </Container>
    </div>
  );
}
