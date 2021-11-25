
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
}
