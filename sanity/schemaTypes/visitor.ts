import { defineType } from "sanity";

const visitor = defineType({
  name: "visitor",
  title: "Visitor Count",
  type: "document",
  fields: [
    {
      name: "total",
      title: "Total Visitors",
      type: "number",
      initialValue: 0,
    },
    {
      name: "today",
      title: "Today Visitors",
      type: "number",
      initialValue: 0,
    },
    {
      name: "lastUpdated",
      title: "Last Updated Date",
      type: "string",
    },
  ],
});

export default visitor;