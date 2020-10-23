export const DIALOG = {
    CONFIRM: {
        DELETE: {
            title: 'Tem certeza de que deseja excluir?',
            content: 'Não será possível desfazer essa ação.',
            actionConfirm: 'Excluir',
            actionCancel: 'Cancelar'
        },
    }
};

export const TOAST = {
    SUCCESS: {
        SAVE: {
            message: 'Registro salvo com sucesso!',
            action: 'Fechar',
            type: 'success-snackbar'
        },
        DELETE: {
            message: 'Registro excluído com sucesso!',
            action: 'Fechar',
            type: 'success-snackbar'
        },
        UPDATE: {
            message: 'Registro atualizado com sucesso!',
            action: 'Fechar',
            type: 'success-snackbar'
        }
    },

    ERROR: {
        message: 'Ops! Houve um problema com este registro!',
        action: 'Fechar',
        type: 'error-snackbar'
    },

    WARNING: {
        message: 'Atenção!',
        action: 'Fechar',
        type: 'warning-snackbar'
    },

    SUPPORT: {
        message: 'Erro interno do servidor, favor contactar o suporte!',
        action: 'Fechar',
        type: 'error-snackbar'
    }
};
