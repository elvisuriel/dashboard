import React, { MouseEvent, ReactNode } from 'react';

interface FormCardProps {
    title: string;
    className?: string;
    showButtons?: boolean;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    submitButtonText?: string;
    Steps: ReactNode[];
    StepsCount: number;
    setStepsCount: React.Dispatch<React.SetStateAction<number>>;
    stepOrderValidation: (count: number) => Promise<boolean>;
    footer?: ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({
    title,
    className,
    showButtons = true,
    onSubmit,
    submitButtonText = 'Enviar',
    Steps,
    StepsCount,
    setStepsCount,
    stepOrderValidation,
    footer,
}) => {
    // Next Step
    const nextStep = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!(await stepOrderValidation(StepsCount))) return;

        if (StepsCount !== Steps.length) {
            setStepsCount((prevState) => prevState + 1);
        }
    };

    // Back step
    const backStep = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (StepsCount > 0) {
            setStepsCount((prevState) => prevState - 1);
        }
    };

    return (
        <div className={`bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 ...  flex justify-center items-center h-screen`}>
            <div
                className={
                    className ||
                    'flex h-full w-full flex-col space-y-2 rounded px-6 py-6 md:h-fit md:max-w-lg md:bg-white'
                }
            >
                <h1 className={`text-4xl font-semibold text-center text-gray-800 mb-7`}>
                    {title}
                </h1>
                <form onSubmit={onSubmit}>
                    {Steps[StepsCount]}
                    {showButtons && (
                        <div className="mt-2 flex flex-1 flex-row space-x-4 font-quicksand">
                            {StepsCount > 0 && (
                                <button
                                    className={`formButton w-full`}
                                    onClick={backStep}
                                    title="Atrás"
                                    type="button"
                                >
                                    Atrás
                                </button>
                            )}

                            {StepsCount === Steps.length - 1 ? (
                                <button className="formButton w-full bg-purple-500 text-white" title="Enviar" type="submit">
                                    {submitButtonText} {/* Usar el texto del botón pasado como prop */}
                                </button>
                            ) : (
                                <button
                                    className={`formButton w-full`}
                                    onClick={nextStep}
                                    title="Siguiente"
                                    type="button"
                                >
                                    Siguiente
                                </button>
                            )}
                        </div>
                    )}
                </form>
                <div className="font-quicksand">{footer}</div>
            </div>
        </div>
    );
};

export default FormCard;
