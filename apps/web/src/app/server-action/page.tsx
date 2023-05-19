import { ITodo } from '@commercetools-dpc/types'
import { Button, Text, TextInput } from '@commercetools-dpc/web-ui'

async function create(formData: FormData) {
  'use server'
  const todo: Partial<ITodo> = {
    title: formData.get('title')?.toString() || '',
    description: formData.get('content')?.toString() || '',
  }
  /* Do server actions here. Like saving to database. */
}

export default function Page() {
  return (
    <form action={create}>
      <Text type="h1">Create Todo</Text>
      <br />
      <Text type="caption">Title</Text>
      <TextInput type="text" name="title" />
      <br />
      <Text type="caption">Content</Text>
      <TextInput name="content" />
      <br />
      <br />
      <Button type="submit" primary>
        Submit
      </Button>
    </form>
  )
}
