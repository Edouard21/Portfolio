import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'rag-multimodal-local',
    titleKey: 'projects:project1.title',
    descriptionKey: 'projects:project1.description',
    category: 'nlp',
    tags: ['Chainlit', 'LangChain', 'ChromaDB', 'Ollama', 'PyMuPDF', 'RAG'],
    image: '/images/rag-multimodal.png',
    problemKey: 'projects:project1.problem',
    solutionKey: 'projects:project1.solution',
    codeSnippet: `@cl.on_message
async def main(message: cl.Message):
    # Recherche sémantique dans ChromaDB
    results = db.similarity_search_with_score(message.content, k=5)
    
    elements = []
    for doc, score in results:
        doc_type = doc.metadata.get("type", "Inconnu")
            
        # Ajout dynamique des images extraites du PDF dans l'interface
        if doc_type == "image_description":
            image_path = doc.metadata.get("image_path")
            if image_path and os.path.exists(image_path):
                elements.append(
                    cl.Image(name=source_name, display="inline", path=image_path)
                )

    msg.content = response.content + source_text
    msg.elements = elements
    await msg.update()`,
    codeLanguage: 'python',
    githubUrl: 'https://github.com/Edouard21/multimodal-rag-industry',
    demoType: 'nlp',
  },
  {
    id: 'ml-detect-bot-rl',
    titleKey: 'projects:project2.title',
    descriptionKey: 'projects:project2.description',
    category: 'mlops',
    tags: ['PyTorch', 'FastAPI', 'React', 'Hugging Face', 'Vercel', 'Rocket League'],
    image: '/images/ml-detect-bot-rl.png',
    problemKey: 'projects:project2.problem',
    solutionKey: 'projects:project2.solution',
    codeSnippet: `@app.post("/analyze")
async def analyze_replay(file: UploadFile = File(...)):
    # Extrait les caractéristiques physiques et réseau
    features = extract_features(await file.read())
    
    # Inférence avec le modèle PyTorch
    with torch.no_grad():
        predictions = model(features)
        
    return {"results": format_predictions(predictions)}`,
    codeLanguage: 'python',
    githubUrl: 'https://github.com/Edouard21/ML_detect_bot_RL',
    demoType: 'none',
  },
];
