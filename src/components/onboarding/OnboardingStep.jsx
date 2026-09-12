export default function OnboardingStep({ step }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center animate-fade-in">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-coffee-100 text-coffee-600 animate-scale-in">
        <span className="material-icons text-5xl">{step.icono}</span>
      </div>
      <h2 className="mb-3 text-xl font-bold text-coffee-800">{step.titulo}</h2>
      <p className="text-sm leading-relaxed text-coffee-600">{step.descripcion}</p>
    </div>
  );
}
