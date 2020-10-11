<?php

namespace App\Tags;

use Statamic\Facades\Collection;
use Statamic\Facades\Term;
use Statamic\Tags\Tags;

class Topics extends Tags
{
    /**
     * Return topics JSON for our game component.
     *
     * @return string
     */
    public function index()
    {
        return Collection::find('questions')
            ->queryEntries()
            ->get()
            ->map(function ($entry) {
                return [
                    'id' => $entry->id(),
                    'question' => $entry->get('title'),
                    'difficulty' => $entry->get('difficulty'),
                    'topic' => $this->getTopicTitle($entry->get('topics')),
                ];
            })
            ->groupBy('topic')
            ->shuffle()
            ->keyBy(function($items) {
                return $items->first()['topic'];
            })
            ->take(6)
            ->map(function ($item) {
                return $item->groupBy('difficulty')
                            ->map
                            ->random()
                            ->sortKeys();
            })
            ->toJson();
    }

    /**
     * Get display friendly topic title from taxonomy term.
     *
     * @param string $topic
     * @return string
     */
    protected function getTopicTitle($topic)
    {
        return Term::find("topics::{$topic}")->get('title');
    }
}
