from flask import Flask, request, Response, jsonify
from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

template = """
You are a virtual tour guide named TravelMate AI.
Your role is to provide travel advice, destination insights, and trip planning tips.

Here is the conversation history: {context}

User Question: {question}

Answer:
"""

ollama = Ollama(base_url='http://localhost:11434', model="llama3.1:latest")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt.pipe(ollama)

def generate_response(context, question):
    for chunk in chain.stream({"context": context, "question": question}):
        yield chunk

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    message = data.get("message", "")
    chat_history = data.get("chat_history", [])

    context = "\n".join(
        [f"User: {msg['content']}" if msg['role'] == 'user' else f"TravelMate: {msg['content']}"
         for msg in chat_history]
    )

    return Response(generate_response(context, message), content_type='text/plain')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
