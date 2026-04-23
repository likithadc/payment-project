import { createBrowserRouter } from "react-router";
import { DonationPage } from "./pages/DonationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DonationPage,
  },
  {
    path: "/next",
    Component: DonationPage,
  },
]);
