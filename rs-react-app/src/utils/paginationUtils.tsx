export function getPaginationRange(
  currentPage: number,
  totalPages: number
): (number | '...')[] {
  const range: (number | '...')[] = [];

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  range.push(1);

  if (currentPage > 4) {
    range.push('...');
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (currentPage < totalPages - 3) {
    range.push('...');
  }

  range.push(totalPages);

  return range;
}
