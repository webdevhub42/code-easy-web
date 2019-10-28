import ProjectType from "../enuns/ProjectType";
import ItemType from "../enuns/ItemType";
import { FluxoItemTypes } from "../../pages/editor/tabs/editor-tab/components/code-editor/enuns/FluxoList";

/**
 * Interface para o projeto que está sendo desenvolvido no momento!
 */
export interface Aplication {
    projectConfigs: ProjectConfigs;
    routers: ContentTab;
    actions: ContentTab;
    data: ContentTab;
}

/**
 * Tab para que pode do tipo "router", "actions" e "data".
 */
interface ContentTab {
    pastas: Pasta[];
    items: FlowItem[];
}

/**
 * Uma estrutura de pasta que pode ser usada dentro das tabs;
 */
interface Pasta {
    configs: ItemConfigs;
    pastas: Pasta[];
    items: FlowItem[];
}

/**
 * Item que está dentro das pastas nas tabs ou nas tabs, 
 * vai representar uma action, routa ou uma tabela na base.
 */
export interface FlowItem {
    configs: ItemConfigs;
    key: number,
    top: number,
    left: number,
    width: number,
    height: number,
    title: string
    fluxoItemTypes: FluxoItemTypes,
    isHaveSucessor: boolean,
    isHaveAntecessor: boolean,
    antecessorKey: string | number,
    sucessorKey: string | number,
}

/**
 * Compõem as configurações de um item de fluxo ou uma pasta.
 */
interface ItemConfigs {
    name: string;
    description: string;
    type: ItemType;
}

/**
 * Exclusivamente utilizada na configuração do projeto,
 * em informações que definem o tipo de projeto.
 * 
 * Representa: "Nome do projeto", "version", "autor" e etc...
 */
interface ProjectConfigs {
    name: string;
    description: string;
    type: ProjectType;
    version: string;
    autor: string;
    currentProcess: string;
}
