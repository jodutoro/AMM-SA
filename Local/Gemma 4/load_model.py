from transformers import AutoProcessor, AutoModelForCausalLM

MODEL_ID = "google/gemma-2b"  # Replace with your desired model ID

processor = AutoProcessor.from_pretrained(MODEL_ID)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    dtype="auto",
    device_map="auto"
)

print("Model and processor loaded successfully!")
print(f"Model: {model}")
print(f"Processor: {processor}")
