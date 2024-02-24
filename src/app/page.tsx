import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IFormDraft from "./types/FormDraft";
import Chat from "@/components/Chat";

export default async function Index() {
  const formData: IFormDraft = await fetch(
    "http://localhost:3000/api/form"
  ).then((res) => res.json());

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>{formData?.title}</CardTitle>
          <CardDescription>{formData?.objective}</CardDescription>
        </CardHeader>
        <Chat />
      </Card>
    </div>
  );
}
