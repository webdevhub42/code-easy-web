import React, { useContext, useState } from 'react';

import { PropertiesTab } from '../../../pages/editor/properties-tab/PropertiesTab';
import { CodeEditorContext } from '../../services/contexts/CodeEditorContext';
import { ProjectsStorage } from '../../services/storage/ProjectsStorage';
import { TabButton, TabGroup } from '../tab-button/TabButton';
import { TabsManager } from '../tab-manager/TabsManager';
import { Tab } from '../../interfaces/Tabs';
import { Modal } from '../modal/Modal';
import './ToolBar.css';

export const ToolBar: React.FC = () => {
    const codeEditorContext = useContext(CodeEditorContext);
    const tabs: Tab[] = (codeEditorContext.project?.tabs || []);

    const [isOpenModalProps, setIsOpenModalProps] = useState(false);

    return (<>
        <div className="tool-bar background-bars">
            <div style={{ width: "90px" }}>
                <TabButton
                    id="tabMenu"
                    title="Menu"
                    to="/projects"
                    className=" btn btn-open-menu-tab outline-none"
                />
                <hr className="hr hr-vertical" />
                <TabButton
                    id="tabPropriedades"
                    title="Propriedades do projeto"
                    className=" btn-open-properties-tab"
                    onClick={() => setIsOpenModalProps(true)}
                />
            </div>
            <hr className="hr hr-vertical" />
            <TabsManager
                tabs={codeEditorContext.project.openWindows || []}
                onChange={windowId => {
                    if (codeEditorContext.project.projectConfigs.id) {
                        codeEditorContext.updateProjectState(ProjectsStorage.selectWindowById(codeEditorContext.project, windowId));
                    }
                }}
                onCloseWindowTab={windowId => {
                    if (codeEditorContext.project.projectConfigs.id) {
                        codeEditorContext.updateProjectState(ProjectsStorage.removeWindowById(codeEditorContext.project, windowId));
                    }
                }}
            />
            <hr className="hr hr-vertical" />
            <div style={{ justifyContent: "flex-end" }}>
                <TabGroup>
                    {tabs.map((tab: Tab, index) => {
                        return (
                            <TabButton
                                id={tab.configs.name}
                                key={tab.configs.name}
                                content={tab.configs.label}
                                title={tab.configs.description}
                                isSelected={tab.configs.isEditing}
                                className="btn-open-routers-tab flex1"
                                onClick={() => {
                                    codeEditorContext.project.tabs.forEach(currentTab => currentTab.configs.isEditing = false);
                                    codeEditorContext.project.tabs[index].configs.isEditing = true;
                                    codeEditorContext.updateProjectState(codeEditorContext.project)
                                }}
                                onFocus={() => {
                                    codeEditorContext.project.tabs.forEach(currentTab => currentTab.configs.isEditing = false);
                                    codeEditorContext.project.tabs[index].configs.isEditing = true;
                                    codeEditorContext.updateProjectState(codeEditorContext.project)
                                }}
                            />
                        );
                    })}
                </TabGroup>
            </div>
        </div>
        <Modal
            initialHeight={500}
            title={"Properties"}
            isOpen={isOpenModalProps}
            primaryButtomText={"Done"}
            children={<PropertiesTab />}
            secondaryButtomText={"Close"}
            onClickPrimary={() => setIsOpenModalProps(false)}
            onClickSecondary={() => setIsOpenModalProps(false)}
            onClose={(value) => { setIsOpenModalProps(false); return true; }}
        />
    </>);
};
