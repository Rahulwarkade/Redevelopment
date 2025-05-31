"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Text, Button, Image } from "@/components";
import { Icons } from "@/assets/icons";

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id");

  // You can map session_id to plan name if needed
  const planName =
    sessionId === "free_plan"
      ? "Free Plan"
      : sessionId === "pro_plan"
      ? "Pro Plan"
      : sessionId === "enterprise_plan"
      ? "Enterprise Plan"
      : "Your Plan";

  return (
    <Container className="min-h-[60vh] flex flex-col items-center justify-center gap-8 bg-white">
      <span className="w-[80px] h-[80px] flex items-center justify-center rounded-full bg-green-100 mb-2">
        <Image
          src={Icons.CheckCircle2}
          alt="Success"
          width={60}
          height={60}
          className="object-contain"
        />
      </span>
      <Text className="text-2xl md:text-3xl font-bold text-green-700 text-center">
        Payment Successful!
      </Text>
      <Text className="text-lg md:text-xl text-gray-700 text-center">
        Thank you for subscribing to the <span className="font-semibold">{planName}</span>.
      </Text>
      <Button
        className="mt-6 px-8 py-3 bg-[#515DEF] text-white rounded-lg text-lg"
        onClick={() => router.push("/")}
      >
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default PaymentSuccess;