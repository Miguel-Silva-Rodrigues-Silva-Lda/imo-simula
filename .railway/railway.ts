import { defineRailway, project, service } from "railway/iac";

// Keep this name stable: this repository owns only the ImoSimula service.
export const partial = "imo-simula";

export default defineRailway((ctx) => {
  const web = service("imo-simula", {
    build: "npm run build",
    start: "npm start",
    healthcheck: "/",
  });

  return {
    ...project(ctx.projectName ?? "imo-simula", { resources: [web] }),
    // CLI >= 5.75.0: variables continue to be managed in Railway.
    variables: { managed: false },
  };
});
