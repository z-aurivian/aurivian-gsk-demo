// Portfolio — Demo Brief §2.
// Products surface in the header selector and scope most agent views.
// Optional: platformLens for customers that track a cross-indication
// platform/mechanism (e.g. Dyne FORCE™).

export const PRODUCT_OPTIONS = [
  { id: 'nucala',   name: 'Nucala',   generic: 'mepolizumab',                    indications: ['Severe eosinophilic asthma', 'EGPA', 'HES', 'CRSwNP'], division: 'Immunology' },
  { id: 'benlysta', name: 'Benlysta', generic: 'belimumab',                      indications: ['Systemic lupus erythematosus', 'Lupus nephritis'],      division: 'Immunology' },
  { id: 'arexvy',   name: 'Arexvy',   generic: 'RSV vaccine (AS01E adjuvanted)', indications: ['RSV prevention in adults 60+', 'Adults 50–59 at increased risk'], division: 'Immunology' },
  { id: 'blenrep',  name: 'Blenrep',  generic: 'belantamab mafodotin',           indications: ['Relapsed/refractory multiple myeloma (BCMA ADC)'],      division: 'Oncology' },
  { id: 'jemperli', name: 'Jemperli', generic: 'dostarlimab',                    indications: ['dMMR/MSI-H endometrial cancer', 'dMMR/MSI-H solid tumors'], division: 'Oncology' },
  { id: 'zejula',   name: 'Zejula',   generic: 'niraparib',                      indications: ['Advanced ovarian cancer — 1L maintenance', 'Recurrent ovarian cancer maintenance'], division: 'Oncology' },
];

// Platform / mechanism lens. Leave null when not applicable.
export const PLATFORM_LENS = null;
