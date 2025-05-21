import "server-only";

export const token = process.env.SANITY_API_READ_TOKEN || 'skflJj0hxZlmY0ySLouDWul01zzSluqbJSUspunQAFJ34RCEhf7zwkTciGihmpArQ1HLDlikw0JLzwkCLO8i9SRb3xhdIizdo5bCKjqwoCkNtTFpUbAGr0e02BdIfqnPv0fsqHfIwhI1POir6n5sbKnOcvrfAEVGR3UvYiwCPEO9fcPxyBAu';

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}
