// Canonical import surface for the demo config bundle.
// One filled-out Demo Brief = one customer's values across these modules.
// See DEMO_BRIEF_TEMPLATE.md for the schema.

export { CLIENT, CAPTURE_APP_URL, PULSE_BRIEF_URL } from './customer';
export { PRODUCT_OPTIONS, PLATFORM_LENS } from './products';
export { CONGRESS_OPTIONS } from './congresses';
export { THERAPEUTIC_AREA } from './therapeutic-area';
export { ISP_PILLARS, MEDICAL_OBJECTIVES, LISTENING_PRIORITIES, COVERAGE_TARGETS } from './strategy';
export { INSIGHTS } from './insights';
export { ACTIONS } from './actions';
export { KOL_DATA } from './kols';
export { OUTCOME_VOLUME } from './outcome-volume';
export { GAP_RADAR } from './gap-radar';
export { SIGNALS } from './signals';
export { PREDICTIVE_SIGNALS } from './predictive-signals';
export { KIT_SCORECARDS } from './kit-scorecards';
export { EMERGING_THEMES } from './emerging-themes';
export { INSIGHT_TO_IMPACT } from './insight-to-impact';
export { INSIGHT_SOURCES, KIT_RELEVANCE_TREND } from './insight-sources';
export { MESSAGING_PILLARS, getMessagingAlignment } from './messaging-alignment';
export {
  VEGA_AWARENESS_PROGRESSION,
  VEGA_INTERACTION_QUALITY,
  VEGA_ENGAGEMENT_GAPS,
  VEGA_SHARE_OF_VOICE,
  VEGA_SENTIMENT_VELOCITY,
  VEGA_CARE_GAP_CLOSURE,
  VEGA_ROMI,
  VEGA_IMPACT_INDEX,
} from './vega';
export { AURI_PROMPTS, SUGGESTED_PROMPTS } from './auri-prompts';
export { AGENTS, AGENT_LIST } from './agents';
export { ARTIFACTS } from './artifacts';
export { SYSTEM_PROMPT_CTX } from './system-prompt';
