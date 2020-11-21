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

                <p>
                    <Trans i18nKey="about.noToViolenceIntro" />
                </p>
                <p>
                    {t('about.text1')}
                    {
                        <a
                            href="https://www.michalsela.org.il/hackathon"
                            target="_blank"
                        >
                            {t('about.linkHackathon')}
                        </a>
                    }
                    {t('about.text2')}
                    {
                        <a
                            href="https://www.facebook.com/oneofone1/"
                            target="_blank"
                        >
                            {t('about.linkOneofOne')}
                        </a>
                    }
                    {t('about.text3')}
                    {
                        <a
                            href="https://politicallycorret.co.il/beenthere/"
                            target="_blank"
                        >
                            {t('about.linkHaytisham')}
                        </a>
                    }
                    <Trans i18nKey="about.text4" />
                </p>
                <p>{t('about.text5')}</p>
                <h2>{t('about.onNoToViolenceHeader')}</h2>
                <p>
                    <Trans i18nKey="about.text6" />
                </p>
                <p>
                    <Trans i18nKey="about.text7" />
                </p>
                <p>
                    <Trans i18nKey="about.text8" />
                </p>
                <div className="divider">...</div>
                <p>
                    <Trans i18nKey="about.intro" />
                </p>
                <h2>{t('about.volunteersNamesTitle')}</h2>
                <p>
                    <Trans i18nKey="about.volunteersNames" />
                </p>
                <h2>{t('about.volunteersNoViolenceTitle')}</h2>
                <p>
                    <Trans i18nKey="about.volunteersNoViolenceNames" />
                </p>
                <h3>
                    <span>{t('about.inCollaboration')}</span>
                </h3>
                <div className="logo-container">
                    <a href="https://www.michalsela.org.il/" target="_blank">
                        <MichalSelaLogo />
                    </a>
                    <a href="https://politicallycorret.co.il/" target="_blank">
                        <PoliticlyKoretLogo />
                    </a>
                    <a href="https://www.onlife.co.il/" target="_blank">
                        <OnlifeLogo />
                    </a>
                    <a href="https://no2violence.co.il/" target="_blank">
                        <LoLalimotLogo />
                    </a>
                </div>
            </Content>
        </Skeleton>
    );
};

export default About;
