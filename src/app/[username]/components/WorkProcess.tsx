"use client";

interface WorkProcessProps {
  steps: string[];
}

export function WorkProcess({ steps }: WorkProcessProps) {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">How I Work</h3>
      <div className="space-y-0">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 py-3 border-b border-gray-100 dark:border-white/5 last:border-0">
            <span className="font-mono text-gray-300 dark:text-gray-600 font-bold">0{idx + 1}</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">{step}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
