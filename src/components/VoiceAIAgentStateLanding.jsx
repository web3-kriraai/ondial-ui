import SubServiceHeroSection from '@/components/SubServiceHeroSection';
import VoiceAIAgent from '@/components/VoiceAIAgent';
import KeyFeature from '@/components/KeyFeature';
import IndustrySurveySection from '@/components/IndustrySurveySection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import HowOnDialWorks from '@/components/HowOnDialWorks';
import WhyChooseSection from '@/components/WhyChooseSection';
import StateVoiceAIBenefitsGrid from '@/components/StateVoiceAIBenefitsGrid';
import StateVoiceAIBusinessBenefits from '@/components/StateVoiceAIBusinessBenefits';

/**
 * CMS / regional voice landing (Contentful). Payload from getVoiceAIAgentStatePagePayload.
 */
export default function VoiceAIAgentStateLanding({ data }) {
  if (!data?.heroData) return null;

  const { stateLabel } = data;
  const highlight = stateLabel;

  return (
    <div className="min-h-screen">
      <SubServiceHeroSection
        title={data.heroData.title}
        subtitle={data.heroData.subtitle}
        description={data.heroData.description}
        primaryButtonText={data.heroData.primaryButtonText}
        secondaryButtonText={data.heroData.secondaryButtonText}
        primaryButtonLink={data.heroData.primaryButtonLink}
        secondaryButtonLink={data.heroData.secondaryButtonLink}
      />

      {data.aboutData && <VoiceAIAgent data={data.aboutData} />}

      {data.keyFeaturesData && <KeyFeature data={data.keyFeaturesData} />}

      {data.useCasesData?.industries?.length > 0 && (
        <IndustrySurveySection
          title={data.useCasesData.title}
          subtitle={data.useCasesData.subtitle}
          description={data.useCasesData.description}
          industries={data.useCasesData.industries}
        />
      )}

      {data.benefitsBlock && (
        <StateVoiceAIBenefitsGrid
          title={data.benefitsBlock.title}
          items={data.benefitsBlock.items}
        />
      )}

      {data.businessBenefits && (
        <StateVoiceAIBusinessBenefits
          title={data.businessBenefits.title}
          description={data.businessBenefits.description}
          items={data.businessBenefits.items}
        />
      )}

      {data.howAgentWorksData && (
        <HowOnDialWorks
          title={data.howAgentWorksData.title}
          subtitle={data.howAgentWorksData.subtitle}
          description={data.howAgentWorksData.description}
          steps={data.howAgentWorksData.steps}
        />
      )}

      {data.whyChooseData && (
        <WhyChooseSection
          subtitle={data.whyChooseData.subtitle}
          title={data.whyChooseData.title}
          description={data.whyChooseData.description}
          highlightText={highlight}
          features={data.whyChooseData.features}
        />
      )}

      {data.ctaData && (
        <CTASection
          badgeIcon={data.ctaData.badgeIcon || 'Bot'}
          badgeText={data.ctaData.badgeText || 'AI-Powered Solutions'}
          title={data.ctaData.title || 'Transform Your Business'}
          highlightedTitle={data.ctaData.highlightedTitle || 'OnDial'}
          description={
            data.ctaData.description || 'Experience the power of advanced AI technology.'
          }
          primaryButtonText={data.ctaData.primaryButtonText || 'Get Started'}
          secondaryButtonText={data.ctaData.secondaryButtonText || 'Contact Us'}
          primaryButtonLink={data.ctaData.primaryButtonLink || '/login'}
          secondaryButtonLink={data.ctaData.secondaryButtonLink || '/contact'}
          imageSrc="/img/vector/vector7.png"
          imageAlt={`${stateLabel} AI Voice Agent`}
          showIllustration
          backgroundClass="bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-blue-50/50"
        />
      )}

      {data.faqData?.faqs?.length > 0 && (
        <FAQSection
          badgeIcon="HelpCircle"
          badgeText={`${stateLabel} Voice AI FAQs`}
          title="Frequently Asked Questions About"
          highlightedTitle={`${stateLabel} AI Voice Agents`}
          description={`Answers about OnDial for businesses serving customers in ${stateLabel}.`}
          faqs={data.faqData.faqs}
        />
      )}
    </div>
  );
}
