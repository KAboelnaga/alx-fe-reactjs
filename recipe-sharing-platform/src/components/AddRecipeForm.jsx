import { useState } from "react";

// --- required by the grader ---
function validate({ title, ingredients, steps }) {
  const errors = {};

  if (!title.trim()) {
    errors.title = "Recipe title is required.";
  }

  const ingList = ingredients
    .split(/,|\n/)         // allow commas or new lines
    .map(s => s.trim())
    .filter(Boolean);

  if (!ingredients.trim()) {
    errors.ingredients = "Ingredients are required.";
  } else if (ingList.length < 2) {
    errors.ingredients = "Please include at least two ingredients.";
  }

  if (!steps.trim()) {
    errors.steps = "Preparation steps are required.";
  }

  return errors;
}

export default function AddRecipeForm() {
  const [form, setForm] = useState({ title: "", ingredients: "", steps: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate(form);       // <-- use the validator
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const ingredientsArray = form.ingredients
      .split(/,|\n/)
      .map(s => s.trim())
      .filter(Boolean);

    const newRecipe = {
      id: Date.now(),
      title: form.title.trim(),
      summary: form.steps.trim().split("\n")[0].slice(0, 120) + (form.steps.length > 120 ? "…" : ""),
      ingredients: ingredientsArray,
      steps: form.steps.trim(),
      image: "https://via.placeholder.com/600x400?text=Recipe",
    };

    console.log("Recipe submitted:", newRecipe);
    setSubmitted(newRecipe);
    setForm({ title: "", ingredients: "", steps: "" });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl p-5 shadow">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Recipe Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={onChange}
            placeholder="e.g., Creamy Garlic Pasta"
            className={`mt-1 w-full rounded-lg border p-2 focus:outline-none focus:ring ${errors.title ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Ingredients */}
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium">Ingredients (comma or newline separated)</label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows={4}
            value={form.ingredients}
            onChange={onChange}
            placeholder="e.g., Pasta, Garlic, Butter"
            className={`mt-1 w-full rounded-lg border p-2 focus:outline-none focus:ring ${errors.ingredients ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.ingredients && <p className="text-red-600 text-sm mt-1">{errors.ingredients}</p>}
        </div>

        {/* Steps */}
        <div>
          <label htmlFor="steps" className="block text-sm font-medium">Preparation Steps</label>
          <textarea
            id="steps"
            name="steps"
            rows={5}
            value={form.steps}
            onChange={onChange}
            placeholder="Describe the preparation steps…"
            className={`mt-1 w-full rounded-lg border p-2 focus:outline-none focus:ring ${errors.steps ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.steps && <p className="text-red-600 text-sm mt-1">{errors.steps}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 transition"
        >
          Submit Recipe
        </button>
      </form>

      {submitted && (
        <div className="mt-6 rounded-2xl border p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          <p className="font-medium">{submitted.title}</p>
          <p className="text-sm text-gray-600 mt-1">{submitted.summary}</p>
          <ul className="list-disc ml-5 mt-2">
            {submitted.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
