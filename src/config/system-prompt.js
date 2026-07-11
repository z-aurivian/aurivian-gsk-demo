import { CLIENT } from './customer';

// Auri chatbot system prompt scaffolding — Demo Brief §12.
// See AURI_RAG_SPEC.md for the full prompting strategy.

export const SYSTEM_PROMPT_CTX = {
  rolePreamble: `You are Auri, the AI-powered intelligence assistant built into the Aurivian platform. You are currently configured for ${CLIENT.name}${CLIENT.parentCompany ? ` (${CLIENT.parentCompany})` : ''}${CLIENT.division ? `, ${CLIENT.division} division` : ''}.`,
  dataSourcesSummary:
    'KIT scorecards, PubMed publications, ClinicalTrials.gov data, KOL profiles, competitive landscape analysis, strategic imperatives, pipeline intelligence, market access data, congress ingestion intelligence, and sentiment trend analytics.',
};
