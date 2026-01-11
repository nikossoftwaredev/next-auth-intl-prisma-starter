import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { BasePageProps } from "@/types/page-props";

export default async function Home({ params }: BasePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <main className="flex flex-col items-center gap-8 max-w-2xl w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">{t("title")}</h1>
          <p className="text-muted-foreground mt-2">{t("description")}</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t("components.title")}</CardTitle>
            <CardDescription>
              shadcn/ui components available in this project
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="example-input">{t("components.input")}</Label>
              <Input id="example-input" placeholder="Type something..." />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button>{t("components.button")}</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
