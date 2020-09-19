import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import Skeleton from 'src/components/Skeleton';
import LoLalimotLogo from 'src/media/icons/lo_lalimot_logo.svg';
import MichalSelaLogo from 'src/media/icons/michal_sela_logo.svg';
import OnlifeLogo from 'src/media/icons/Onlife_logo.svg';
import PoliticlyKoretLogo from 'src/media/icons/politicly_koret_logo.svg';

export const About = () => {
    const { t } = useTranslation();
    return (
        <Skeleton>
            <div className="about">
                <h1>{t('about.header')}</h1>
                <p>
                    <Trans i18nKey="about.intro"></Trans>
                </p>
                <h2>{t('about.volunteersNamesTitle')}</h2>
                <p>
                    <Trans i18nKey="about.volunteersNames"></Trans>
                </p>
                <h3>
                    <span>{t('about.inCollaboration')}</span>
                </h3>
                <div className="logo-container">
                    <MichalSelaLogo />
                    <PoliticlyKoretLogo />
                    <OnlifeLogo />
                    <LoLalimotLogo />
                </div>
            </div>
        </Skeleton>
    );
};

export default About;
