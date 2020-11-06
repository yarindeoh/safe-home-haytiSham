import React from 'react';
import { useTranslation } from 'react-i18next';
import { useModerationStories } from 'containers/Moderation/moderationHooks';
import { Loader } from 'components/Loader';
import EditImg from 'src/media/icons/Edit.svg';
import Pagination from '@material-ui/lab/Pagination';

export const ModerateStoriesList = ({ handleStoryClick }) => {
    const {
        stories,
        currentPage,
        totalPages,
        totalStories,
        handlePageChange,
        didFetch
    } = useModerationStories();
    const { t } = useTranslation();

    return (
        <div className={'stories-to-moderated-container'}>
            <Loader data={didFetch?didFetch: undefined}>
                {totalStories === 0 ? (
                    <div className="stories-to-moderated-empty-list">
                        {t('login.emptyList')}
                    </div>
                ) : (
                    <>
                        <h1>
                            {t('login.listToModerate', { num: totalStories })}
                        </h1>

                        <table className="stories-to-moderated-table">
                            <thead>
                                <tr>
                                    <th>{t('login.table.date')}</th>
                                    <th>{t('login.table.name')}</th>
                                    <th>{t('login.table.mail')}</th>
                                    <th>{t('login.table.contact')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stories &&
                                    Object.keys(stories).map(key => {
                                        return (
                                            <tr
                                                onClick={() =>
                                                    handleStoryClick(
                                                        stories[key]._id
                                                    )
                                                }
                                                key={key}
                                            >
                                                <td>
                                                    {stories[key]?.createdAt}
                                                </td>
                                                <td>{stories[key]?.name}</td>
                                                <td>{stories[key]?.mail}</td>
                                                <td
                                                    className={
                                                        'edit-icon-container'
                                                    }
                                                >
                                                    {stories[key]?.contact
                                                        ? t('login.table.yes')
                                                        : t('login.table.no')}
                                                    <EditImg
                                                        className={'edit-icon'}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <Pagination
                            classes={{
                                ul: 'pagination-ul',
                                root: 'pagination-root'
                            }}
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            boundaryCount={2}
                            showFirstButton
                            showLastButton
                        />
                    </>
                )}
            </Loader>
        </div>
    );
};
