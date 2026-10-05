import { render, screen } from "@testing-library/react";
import TodoFilterBar from "./component/TodoFilterBar";

test("renders todo items", () => {
  render(
    <TodoFilterBar
      todos={[{ id: "todo-1", title: "Buy groceries", completed: false }]}
    />
  );

  expect(screen.getByText("Buy groceries")).toBeInTheDocument();
});
