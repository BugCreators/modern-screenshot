import { embedBackground } from './embed-background'
import { embedImage } from './embed-image'
import { toArray } from './utils'

import type { Options } from './options'

export async function embedNode<T extends HTMLElement>(
  cloned: T,
  options?: Options,
): Promise<T> {
  if (!(cloned instanceof Element)) return cloned

  await embedBackground(cloned, options)
  await embedImage(cloned, options)
  await embedChildren(cloned, options)

  return cloned
}

async function embedChildren<T extends HTMLElement>(
  cloned: T,
  options?: Options,
): Promise<T> {
  await Promise.all(
    toArray<HTMLElement>(cloned.childNodes)
      .map((child) => embedNode(child, options)),
  )
  return cloned
}
