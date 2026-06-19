/**
 * Map key-feature rows (title/description/optional emoji) to a Lucide icon component name.
 * Used by state payload enrichment and the KeyFeature UI.
 * Rules are ordered: first match wins.
 */

/** JSON may use names that differ slightly from `KeyFeature` iconMap keys. */
const ICON_ALIASES = {
  Globe2: 'Globe',
  CheckCircle: 'CheckCircle2',
  Shield: 'ShieldCheck',
  MessageSquare: 'MessageCircle',
  Heartbeat: 'Stethoscope',
};

export function normalizeKeyFeatureIconName(name) {
  if (!name || typeof name !== 'string') return 'MessageCircle';
  const trimmed = name.trim();
  return ICON_ALIASES[trimmed] || trimmed;
}

export function resolveKeyFeatureIconName(feature) {
  if (!feature || typeof feature !== 'object') return 'MessageCircle';

  const raw = feature.icon;
  const normalizedRaw =
    typeof raw === 'string' && /^[A-Za-z][A-Za-z0-9]*$/.test(raw)
      ? normalizeKeyFeatureIconName(raw)
      : null;

  const t = `${feature.title || ''} ${feature.description || ''}`.toLowerCase();

  // Category-first matching for key feature cards.
  if (/\blead\b|\bqualif(y|ication)\b|\bprospect\b/.test(t)) return 'Target';
  if (/\bhigh[\s-]?volume\b|\bbusy\b.*\bcall\b|\bcall volumes?\b|\btraffic spike\b|call handling/.test(t)) {
    return 'PhoneCall';
  }
  if (/\bfollow[\s-]ups?\b|\bfollow up\b|\bfollowup\b|\bre[\s-]?engagement\b/.test(t)) return 'RefreshCw';
  if (
    /\bmulti[\s-]language\b|\bmixed[\s-]language\b|\bmultilingual\b|\bmany languages\b|\bworldwide\b.*\blanguage\b|\bbilingual\b|\bdialect\b/.test(
      t
    )
  ) {
    return 'Globe';
  }

  if (
    /\b24\s*\/\s*7\b|round[\s-]?the[\s-]?clock|always[\s-]?(on|active)|beyond business hours|continuous support\b/.test(
      t
    )
  ) {
    return 'Headphones';
  }
  if (/\bllm\b|\bchatgpt\b|smarter conversations|context,?\s+intent|intent,? and emotion\b/.test(t)) {
    return 'Brain';
  }
  if (/\btts\b|\btext-to-speech\b|\btext to speech\b/.test(t)) {
    return 'Volume2';
  }
  if (
    /\bvoice cloning\b|human-like\b.*\bvoice\b|realistic\b.*\bvoices\b|\bmultiple tones\b|\baccent variations?\b/.test(t)
  ) {
    return 'Waves';
  }
  if (
    /\bmulti[\s-]language\b|\bmixed[\s-]language\b|\bmultilingual\b|\bmany languages\b|\bworldwide\b.*\blanguage\b/.test(
      t
    )
  ) {
    return 'Globe';
  }
  if (/\bdialect\b|\bbilingual\b|\btranslation\b|\blocalized\b/.test(t)) {
    return 'Languages';
  }
  if (/\bspeech recognition\b|\bvoice commands?\b|\balways listening\b|\bwake word\b/.test(t)) {
    return 'Mic2';
  }
  if (/\bnlp\b|\bmachine learning\b|\bmicroservices?\b.*\b(ai|ml)\b|\bai processor\b/.test(t)) {
    return 'Cpu';
  }
  if (/\breal[\s-]?time\b|\bultra[\s-]?low\b|\blastency\b|\bmilliseconds?\b|\binstant response\b/.test(t)) {
    return 'Zap';
  }
  if (/\bpersonaliz|tailored experience\b|\bcustom voice\b|\bbrand identity\b/.test(t)) {
    return 'Sparkles';
  }
  if (/\binsights?\b.*\b(recommend|suggest)|\bpro tips?\b|\boptimization ideas?\b/.test(t)) {
    return 'Lightbulb';
  }
  if (/\bwebhook\b|\bzapier\b|\bintegrations?\b.*\b(salesforce|hubspot|crm)\b/.test(t)) {
    return 'Plug';
  }
  if (/\bapi\b|\bsdk\b|\brest\b.*\bendpoint\b|\bdeveloper\b.*\baccess\b/.test(t)) {
    return 'Link2';
  }
  if (/\bworkflow layers?\b|\bmulti[\s-]step\b|\borchestrat\b|\bstacked\b.*\bflows?\b/.test(t)) {
    return 'Layers';
  }
  if (/\bteam collaboration\b|\bseat(s)?\b.*\blicense\b|\bworkforce\b/.test(t)) {
    return 'Users';
  }
  if (/\bknowledge base\b|\bplaybooks?\b|\btraining docs?\b/.test(t)) {
    return 'BookOpen';
  }
  if (/\bexport\b.*\breport\b|\btranscripts?\b|\bdocumentation\b/.test(t)) {
    return 'FileText';
  }
  if (/\baudit trail\b|\bcall logs?\b|\bcompliance records?\b/.test(t)) {
    return 'ClipboardList';
  }
  if (/\bquality score\b|\bverified\b|\baccuracy\b|\bsla\b/.test(t)) {
    return 'CheckCircle2';
  }
  if (/\bcloud hosting\b|\binfrastructure\b|\bcluster\b|\bscalable servers?\b/.test(t)) {
    return 'Server';
  }
  if (/\bdashboard\b|\bkpi\b|\bmetrics\b|\banalytics\b|\bperformance data\b/.test(t)) {
    return 'LineChart';
  }
  if (/\bsegmentation\b|\bdistribution\b|\bbreakdown\b.*\bchart\b/.test(t)) {
    return 'PieChart';
  }
  if (/\bemail\b.*\bcampaign\b|\boutbound email\b/.test(t)) {
    return 'Mail';
  }
  if (/\bsms\b|\boutbound messages?\b|\bpush notification\b/.test(t)) {
    return 'Send';
  }
  if (/\balerts?\b|\bnotify\b|\breminders?\b/.test(t)) {
    return 'Bell';
  }
  if (/\bschedule\b|\bworking hours\b|\btime zone\b/.test(t)) {
    return 'Clock';
  }
  if (/\baward\b|\bproven roi\b|\bcase stud(y|ies)\b/.test(t)) {
    return 'Award';
  }
  if (/\bgo live\b|\blaunch\b|\bdeploy\b.*\bfast\b|\bfast rollout\b/.test(t)) {
    return 'Rocket';
  }
  if (/\bbilling\b|\binvoice\b|\bsubscription\b|\bwallet\b/.test(t)) {
    return 'Wallet';
  }
  if (/\bbanking\b|\bpayment gateway\b|\bcredit card\b|\btransactions?\b/.test(t)) {
    return 'CreditCard';
  }
  if (/\bretail\b|\be-?commerce\b|\bshopping\b|\bcart\b|\border(s)?\b/.test(t)) {
    return 'ShoppingCart';
  }
  if (/\breal estate\b|\bproperty\b|\bleasing\b/.test(t)) {
    return 'Building2';
  }
  if (/\bsmart home\b|\bresidential\b/.test(t)) {
    return 'Home';
  }
  if (/\bhospital\b|\bhealthcare\b|\bpatient\b|\bmedical\b|\bclinic\b/.test(t)) {
    return 'Stethoscope';
  }
  if (/\beducation\b|\bstudent\b|\buniversity\b|\bcampus\b|\bcoaching\b/.test(t)) {
    return 'GraduationCap';
  }
  if (/\bmanufactur\b|\bfactory\b|\bproduction\b.*\bline\b/.test(t)) {
    return 'Factory';
  }
  if (/\blogistics\b|\bdelivery\b|\bshipping\b|\bfleet\b/.test(t)) {
    return 'Truck';
  }
  if (/\bportal\b|\bweb app\b|\bmacbook\b|\blaptop\b.*\bagents?\b/.test(t)) {
    return 'Laptop';
  }
  if (/\bmobile\b|\bios\b|\bandroid\b|\bwhatsapp\b|\bsmartphone\b/.test(t)) {
    return 'Smartphone';
  }
  if (/\bradar\b|\bmonitoring\b|\banomaly\b|\bdetect\b.*\bpattern\b/.test(t)) {
    return 'Radar';
  }
  if (/\bwaveform\b|\bequalizer\b|\baudio fingerprint\b|\bsonic\b/.test(t)) {
    return 'AudioLines';
  }
  if (/\bfollow[\s-]ups?\b|\bfollow up\b|\bfollowup\b|\bre[\s-]?engagement\b/.test(t)) {
    return 'RefreshCw';
  }
  if (/\blead\b|\bqualif(y|ication)\b|\bprospect\b/.test(t)) {
    return 'Target';
  }
  if (/\bappointment\b|\bschedul(e|ing)\b|\bbookings?\b/.test(t)) {
    return 'Calendar';
  }
  if (/\bhigh[\s-]?volume\b|\bbusy\b.*\bcall\b|\bcall volumes?\b|\btraffic spike\b/.test(t)) {
    return 'BarChart3';
  }
  if (/\boutbound\b|\bcampaign\b|\btelecall\b|\bdialer\b/.test(t)) {
    return 'PhoneCall';
  }
  if (/\bsecurity\b|\bsecure\b|\bcompliance\b|\bencrypt\b|\benterprise[\s-]grade\b|\bgdpr\b|\bpci\b/.test(t)) {
    return 'ShieldCheck';
  }
  if (/\bworkflow automation\b|\bchatbot workflows?\b|\bcrm\b.*\bsync\b/.test(t)) {
    return 'Bot';
  }
  if (/\bhelpdesk\b|\bsupport\b.*\bknowledge\b|\bfaq\b/.test(t)) {
    return 'HelpCircle';
  }
  if (/\bacoustic\b|\b(record|capture)\b.*\bconversation\b|\bmicrophone\b|\bmic input\b/.test(t)) {
    return 'Mic';
  }
  if (
    /\bnatural\b.*\bspeech\b|\bnative language\b|\bengage customers\b|\bcommunicat\b|\bconversational\b/.test(t)
  ) {
    return 'MessageCircle';
  }

  return normalizedRaw || 'MessageCircle';
}
