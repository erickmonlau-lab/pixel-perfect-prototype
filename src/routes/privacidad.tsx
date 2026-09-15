import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Privacidad y tratamiento de archivos | ARVIO" },
      {
        name: "description",
        content:
          "Cómo trata ARVIO tus documentos: las herramientas actuales procesan los archivos en tu navegador y no se envían a ningún servidor.",
      },
      { property: "og:title", content: "Privacidad y tratamiento de archivos | ARVIO" },
      {
        property: "og:description",
        content: "Las herramientas actuales de ARVIO procesan tus archivos en tu propio dispositivo.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-eyebrow">Transparencia</p>
      <h1 className="text-display mt-3 text-3xl sm:text-4xl">Qué pasa con tus archivos</h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground/85">
        <p>
          Todas las herramientas publicadas hoy en ARVIO se ejecutan dentro de tu navegador. El
          documento que seleccionas no se envía a ningún servidor, no se almacena y no se comparte
          con terceros.
        </p>
        <p>
          Al cerrar o recargar la página, los archivos y los resultados generados desaparecen de la
          memoria del navegador. No conservamos copias porque nunca las recibimos.
        </p>
        <h2 className="text-xl">Herramientas que sí necesitarán servidor</h2>
        <p>
          Algunas conversiones, como PDF a Word o Word a PDF, requieren un motor de procesamiento en
          servidor. Están marcadas como «en construcción» y no aceptan archivos todavía. Cuando se
          publiquen, esta página explicará exactamente cuánto tiempo se conserva cada archivo y
          cómo se elimina.
        </p>
        <h2 className="text-xl">Sin cuentas ni seguimiento innecesario</h2>
        <p>
          Puedes usar las herramientas sin registrarte. Todavía no existen cuentas de usuario, por lo
          que no recogemos datos personales asociados a tu actividad.
        </p>
      </div>
    </div>
  );
}
