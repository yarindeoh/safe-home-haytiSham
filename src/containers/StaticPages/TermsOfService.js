import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'components/Skeleton';
import { Content } from 'components/Content';

const sections = [
    'responsability',
    'theContent',
    'siteResponsibility',
    'informationContentOnly'
];

export const TermsOfService = () => {
    const { t } = useTranslation();

    return (
        <Skeleton>
            <Content className="terms-of-service">
                <h1>{t('termsOfService.header')}</h1>
                {sections.map(section => (
                    <p key={section}>{t(`termsOfService.${section}`)}</p>
                ))}
            </Content>
        </Skeleton>
    );
};

export default TermsOfService;
