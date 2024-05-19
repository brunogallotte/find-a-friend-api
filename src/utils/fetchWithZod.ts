import { z, ZodType } from 'zod'

type InferZodSchema<T extends ZodType<any, any>> = z.infer<T>

type HandlerProps<T extends ZodType<any, any>> = Omit<RequestInit, 'body'> & {
  schema?: T
  body?: any
}

export const fetchWithZod = async <T extends ZodType<any, any>>(
  url: string,
  options?: HandlerProps<T>,
): Promise<InferZodSchema<T>> => {
  return await fetch(url, options).then(async (res) => {
    if (!res.ok)
      throw new Error(`Network response was not ok, status: ${res.status}`, {
        cause: res.json() || '',
      })

    const parsedRes = (await res.json()) || undefined

    if (options?.schema) options.schema.parse(await parsedRes)
    return parsedRes as InferZodSchema<T>
  })
}
