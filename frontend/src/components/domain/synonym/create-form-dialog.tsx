import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputTags } from "@/components/ui/input-tags";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCreateSynonym } from "@/api/synonym/create-synonym";
import { synonymSchema } from "@/schema";
import { Synonym } from "@/types";

type Props = {
  isOpen: boolean;
  initialValues?: Synonym;
  handleOpenChange: (isOpen: boolean) => void;
};

export function SynonymCreateFormDialogTrigger() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <PlusCircle className="w-4 h-4 mr-2" /> Add new synonyms
      </Button>
      {isDialogOpen && (
        <SynonymCreateFormDialog handleOpenChange={setIsDialogOpen} isOpen />
      )}
    </>
  );
}

export default function SynonymCreateFormDialog({
  isOpen,
  handleOpenChange,
}: Props) {
  const form = useForm<Synonym>({
    resolver: zodResolver(synonymSchema),
    defaultValues: {
      word: "",
      synonyms: [],
    },
  });

  const navigate = useNavigate();
  const createSynonymMutation = useCreateSynonym();

  async function onSubmit(values: Synonym) {
    try {
      const { word } = await createSynonymMutation.mutateAsync(values);
      toast.success(`Created synonyms for ${word}.`);
      navigate(`/${word}`);
      handleOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Could not create synonym, please try again.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add synonyms</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Word</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a word.." {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="synonyms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Synonyms</FormLabel>
                  <FormControl>
                    <InputTags placeholder="Enter a synonym.." {...field} />
                  </FormControl>
                  <FormDescription>
                    You can add multiple synonyms by separating them with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="grid grid-flow-col grid-cols-2 gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={createSynonymMutation.isPending}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={
                  createSynonymMutation.isPending || !form.formState.isValid
                }
              >
                Create synonyms
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
