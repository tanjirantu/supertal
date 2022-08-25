import React, { useEffect, useRef } from 'react';

interface IInfiniteScroll {
    actionEvent: ({ skip }: { skip: number }) => void;
    skip: number;
    count: number;
    direction?: 'top' | 'bottom';
    children: React.ReactChild[] | React.ReactChild;
    margin: number;
    isLoading: boolean;
}

const InfiniteScroll: React.FC<IInfiniteScroll> = ({
    actionEvent,
    skip,
    count,
    direction = 'bottom',
    children,
    margin,
    isLoading,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const options = {
        root: null,
        rootMargin: `${margin}px`,
        threshold: 0,
    };
    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting === true && !isLoading) {
            if (skip < count) {
                actionEvent({ skip });
            }
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        ref.current && observer.observe(ref.current);

        return () => {
            ref.current && observer.unobserve(ref.current);
        };
    }, [ref.current, skip, count, isLoading]);

    return (
        <>
            {direction === 'top' && React.Children.count(children) > 0 ? (
                <div className="h-0.5" ref={ref}>
                    &nbsp;
                </div>
            ) : null}
            {children}
            {direction === 'bottom' && React.Children.count(children) > 0 ? (
                <div className="h-0.5" ref={ref}>
                    &nbsp;
                </div>
            ) : null}
        </>
    );
};

export default InfiniteScroll;
