export const abbreviatedPages = (pgs: number, currentPage: number) => {
  let sortedPages: any = []
  let middles: any = []

  const begining = 1
  const totalPages = pgs

  const pages = [...Array.from({ length: totalPages })].map((_, i) => i + 1)

  for (const p of pages) {
    if (p < currentPage - 2) continue
    if (p > currentPage + 2) continue
    middles.push(p)
  }

  if (!middles.includes(begining)) sortedPages.push(begining)
  if (middles[0] - begining > 1) sortedPages.push('...')
  sortedPages = [].concat(sortedPages, middles)
  if (middles.slice(-1)[0] < totalPages) sortedPages.push('...')
  if (!middles.includes(totalPages)) sortedPages.push(totalPages)

  return sortedPages
}
