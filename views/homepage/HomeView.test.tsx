import { render, screen } from "@testing-library/react";
import HomeView from "./HomeView";

describe("Home view", () => {
    test("Renders content", () => {
        render(<HomeView />);

        const content = screen.getByRole("heading", { level: 1 });

        expect(content).toBeInTheDocument();
    });
});
