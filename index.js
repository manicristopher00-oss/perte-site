javascript
import { useState } from 'react';
import useSWR from 'swr';

const API_KEY = "TUA_API_KEY_GNEWS"; // INSERISCI QUI LA TUA API KEY DI GNEWS

const fetcher = (url) => fetch(url).then((res) => res.json());

function PerteSite() {
    const [query, setQuery] = useState('');
    const { data, error } = useSWR(
        query ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${API_KEY}&lang=en&max=1` : null,
        fetcher
    );

    let article = null;
    if (data && data.articles && data.articles.length > 0) {
        article = data.articles[0];
    }

    const perteInsight = (title, description) => {
        // Logica di analisi PERTE (simulata qui)
        // In un'applicazione reale, questa sarebbe la parte più complessa e integrata con modelli IA
        const history = "Collegamento con cicli di potere passati e l'evoluzione delle narrazioni storiche.";
        const psychology = "Impatto sulla percezione collettiva e sulle decisioni individuali, considerando i bias cognitivi.";
        const philosophy = "Riflessioni etiche sulle conseguenze a lungo termine e sulle implicazioni morali.";
        const science = "Analisi basata su dati e modelli predittivi, considerando l'impatto ambientale e tecnologico.";

        return `
            <div>
                <h3>Analisi PERTE per "${title}"</h3>
                <p><strong>Storia:</strong> ${history}</p>
                <p><strong>Psicologia:</strong> ${psychology}</p>
                <p><strong>Filosofia:</strong> ${philosophy}</p>
                <p><strong>Scienza:</strong> ${science}</p>
            </div>
        `;
    };

    return (
        <div className="container">
            <header>
                <h1>PERTE</h1>
                <p>La tua Intelligenza Personale di Riferimento</p>
            </header>

            <div className="search-section">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Inserisci un argomento o una parola chiave..."
                />
                <button onClick={() => setQuery(query)}>Cerca</button>
            </div>

            {error && <div className="error">Errore nel caricamento dei dati. Riprova più tardi.</div>}
            {!query && <div className="placeholder">Inizia la tua ricerca per ottenere un nuovo punto di vista.</div>}

            {article && !error && (
                <div className="article-section">
                    <h2>{article.title}</h2>
                    {article.image && <img src={article.image} alt={article.title} />}
                    <p>{article.description}</p>
                    <div className="perte-analysis" dangerouslySetInnerHTML={{ __html: perteInsight(article.title, article.description) }} />
                    <a href={article.url} target="_blank" rel="noopener noreferrer">Leggi l'articolo originale</a>
                </div>
            )}
