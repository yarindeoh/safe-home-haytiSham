import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'components/Skeleton';
import { Content } from 'components/Content';
import {
    intro,
    how,
    charactersOfRelationship,
    violenceType,
    phones
} from './warningSignsUtils';

export const WarningSigns = () => {
    const { t } = useTranslation();
    const divider = <div className="divider">...</div>;

    const introSection = (
        <React.Fragment>
            {intro.map((text, i) => (
                <p key={`into_${i}`}>{text}</p>
            ))}
        </React.Fragment>
    );

    const charactersOfRelationshipSection = charactersOfRelationship.map(
        ({ title, text }) => (
            <p key={`character_${title}`}>
                <strong>{title} - </strong>
                {text}
            </p>
        )
    );

    const howSection = <p>{how}</p>;

    const violenceTypeSection = violenceType.map(({ title, text }) => (
        <p key={`violence_type_${title}`}>
            <strong>{title} - </strong>
            {text}
        </p>
    ));

    const renderSection = (title, content) => (
        <React.Fragment>
            <h2>{t(`warningSigns.${title}`)}</h2>
            {content}
            {divider}
        </React.Fragment>
    );

    const phonesSection = (
        <div className="phones">
            {phones.map(({ name, phone }) => (
                <p key={`phone_${name}`}>
                    <strong>{name}:</strong>
                    {phone}
                </p>
            ))}
        </div>
    );

    return (
        <Skeleton>
            <Content className="warning-signs">
                <h1>{t('warningSigns.header')}</h1>
                {introSection}
                {divider}
                {renderSection(
                    'charactersOfReletionship',
                    charactersOfRelationshipSection
                )}
                {renderSection('how', howSection)}
                {renderSection('violenceType', violenceTypeSection)}
                {phonesSection}
            </Content>
        </Skeleton>
    );
};

export default WarningSigns;
