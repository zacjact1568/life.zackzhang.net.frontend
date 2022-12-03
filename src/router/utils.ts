export function convertRouteNumberQuery(query: any) {
  let q = undefined;
  if (typeof query == "string") {
    const qn = Number(query);
    if (!isNaN(qn)) {
      q = qn;
    }
  }
  return q;
}

export function generatePostRouteParams(label: string | undefined) {
  if (typeof label != "string") {
    return undefined;
  }
  return {
    name: "post",
    params: {
      label: label,
    },
  };
}
