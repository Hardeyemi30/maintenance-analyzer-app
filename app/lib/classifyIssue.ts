export interface ClassificationResult {
  category: string;
  confidence: number;
}

export function classifyIssue(
  description: string
): ClassificationResult {
  const text = description.toLowerCase();

  // Plumbing
  const plumbingKeywords = [
    "leak",
    "leaking",
    "sink",
    "pipe",
    "water",
    "toilet",
    "drain",
    "faucet"
  ];

  // HVAC
  const hvacKeywords = [
    "air conditioner",
    "ac",
    "hvac",
    "heating",
    "cooling",
    "thermostat",
    "vent"
  ];

  // Electrical
  const electricalKeywords = [
    "outlet",
    "switch",
    "light",
    "electric",
    "electrical",
    "power",
    "circuit",
    "breaker",
    "spark"
  ];

  const hasKeyword = (
    keywords: string[]
  ): boolean => {
    return keywords.some((keyword) =>
      text.includes(keyword)
    );
  };

  if (hasKeyword(plumbingKeywords)) {
    return {
      category: "Plumbing",
      confidence: 0.95,
    };
  }

  if (hasKeyword(hvacKeywords)) {
    return {
      category: "HVAC",
      confidence: 0.92,
    };
  }

  if (hasKeyword(electricalKeywords)) {
    return {
      category: "Electrical",
      confidence: 0.94,
    };
  }

  return {
    category: "General",
    confidence: 0.70,
  };
}