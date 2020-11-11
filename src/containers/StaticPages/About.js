import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import Skeleton from 'src/components/Skeleton';
import Content from 'src/components/Content';
import LoLalimotLogo from 'src/media/icons/lo_lalimot_logo.svg';
import MichalSelaLogo from 'src/media/icons/michal_sela_logo.svg';
import OnlifeLogo from 'src/media/icons/Onlife_logo.svg';
import PoliticlyKoretLogo from 'src/media/icons/politicly_koret_logo.svg';

export const About = () => {
    const { t } = useTranslation();
    return (
        <Skeleton>
            <Content className="about">
                <h1>{t('about.header')}</h1>

                <p>{t('about.noToViolanceIntro')}</p>
                <p>{t('about.noToViolanceActions')}</p>
                <p>{t('about.noToViolanceChange')}</p>
                <div className="divider">...</div>
                <p>
                    <Trans i18nKey="about.intro" />
                </p>
                <h2>{t('about.volunteersNamesTitle')}</h2>
                <p>
                    <Trans i18nKey="about.volunteersNames" />
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
            </Content>
        </Skeleton>
    );
};

export default About;
