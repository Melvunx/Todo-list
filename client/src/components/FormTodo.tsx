import { formSchema } from "@/schema/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type FormTodoProps = {
  onRefresh: () => Promise<void>;
};

const FormTodo: React.FC<FormTodoProps> = ({ onRefresh }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      list: "",
      important: 0,
    },
  });

  const onSubmit = async () => {
    try {
      const data = {
        todo: form.getValues(),
      };
      await fetch("http://localhost:3000/api/todos/new-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      form.reset();
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="list"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="todo list..." {...field} />
              </FormControl>
              <FormDescription>Enter your todo list here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormTodo;
