import { getTranslations, setRequestLocale } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
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
import { ThemeSwitcher } from "@/components/example/ThemeSwitcher";
import { LoginButton } from "@/components/example/login-button";
import { TodoList } from "@/components/examples/todo-list";
import { BasePageProps } from "@/types/page-props";

export default async function Home({ params }: BasePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <LoginButton />
        <ThemeSwitcher />
      </div>
      <main className="flex flex-col items-center gap-8 max-w-4xl w-full mx-auto mt-16">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">{t("title")}</h1>
          <p className="text-muted-foreground mt-2">{t("description")}</p>
        </div>

        {session?.user ? (
          <TodoList />
        ) : (
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Welcome! Please Sign In</CardTitle>
              <CardDescription>
                Sign in with your Google account to start managing your todos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Once you&apos;re signed in, you&apos;ll be able to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Create and manage your personal todo list</li>
                <li>Mark todos as complete</li>
                <li>Edit and delete your todos</li>
                <li>All your data is private and secure</li>
              </ul>
              <div className="mt-6">
                <LoginButton />
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="w-full max-w-2xl">
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
